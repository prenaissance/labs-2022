SYS_EXIT  equ 1
SYS_READ  equ 3
SYS_WRITE equ 4
STDIN     equ 0
STDOUT    equ 1

segment .data
    ; messages for prompts
    menu_msg db "Select an action:", 10, "0: Random number", 10, "1: String length", 10, "9: exit", 10, 0
    menu_msg_len equ $- menu_msg

    exit_msg db "Goodbye!", 10, 0
    exit_msg_len equ $- exit_msg

    random_msg db "Random number: ", 0
    random_msg_len equ $- random_msg

    string_prompt_msg db "Enter a string: ", 0
    string_prompt_msg_len equ $- string_prompt_msg

segment .bss
    choice resb 1
    seed resd 1
    string resb 255 ; string to store input
    string2 resb 255 ; another buffer string

segment .text
    global _start

reverse_str:
    ; Reverses a string
    ; Input: rdi = address of string to reverse
    ;        rsi = address of string to store result

    ; Output: rsi = address of string containing result
    ;         rax = length of string

    push rdi    ; Save the address of the string
    push rsi    ; Save the address of the result string
    push rcx    ; Save any existing value of rcx on the stack
    ; Cycle through the string and push each character onto the stack
    xor rcx, rcx; string length
    _reverse_str_loop:
    cmp byte [rdi], 0
    je _reverse_str_done
    inc rdi
    inc rcx
    jmp _reverse_str_loop
    _reverse_str_done:
    mov rax, rcx    ; String length
    _reverse_str_pop:
    ; Pop each character off the stack and store it in the result string
    ; while rcx is not zero
    pop byte rsi
    inc rsi
    dec rcx
    cmp rcx, 0
    jne _reverse_str_pop
    ; Add a null terminator to the end of the result string
    mov byte [rsi], 0
    ; Restore register values
    pop rcx
    pop rsi
    pop rdi
    ret

int_to_str:
    ; Convert an integer to a string
    ; Input: rdi = integer to convert
    ;        rsi = address of string to store result
    ; Output: rsi = address of string containing result
    ;         rax = length of string
    push rcx    ; Save any existing value of rcx & rdx on the stack
    push rdx
    push rsi    ; since it will be used in the procedure
                ; and the starting address of the string to reset
    xor rcx, rcx

str_len:
    push rcx    ; Save any existing value of rcx on the stack
                ; since it will be used in the procedure
    xor rcx, rcx
_str_len_loop:
    cmp byte [rdi], 0
    je _str_len_done
    inc rdi
    inc rcx
    jmp _str_len_loop
_str_len_done:
    mov rax, rcx    ; return value

    pop rcx
    ret

random:
    ; Get the current system time as the seed for the random number generator
    mov eax, 40h
    xor ebx, ebx
    int 0x80
    mov dword [seed], eax

    ; Generate a random number between 1 and 55 inclusive
    mov eax, dword [seed]
    imul eax, 343FDh
    add eax, 269EC3h
    mov dword [seed], eax
    and eax, 7FFFFFFFh
    mov ebx, 55
    xor edx, edx
    div ebx
    inc eax

    ; Return the random number
    ret

_start:

prompt:
    ; Test

    lea rdi, [random_msg]
    lea rsi, [string2]
    call reverse_str

    mov edx, eax
    mov eax, SYS_WRITE
    mov ebx, STDOUT
    mov ecx, string2
    int 0x80
    jmp exit

    ; Write menu
    mov eax, SYS_WRITE   ; System write
    mov ebx, STDOUT      ; System output
    mov ecx, menu_msg    ; What to write
    mov edx, menu_msg_len; Length to write
    int 0x80             ; Interupt Kernel

    mov eax, SYS_READ    ; System read
    mov ebx, STDIN       ; System input
    mov ecx, choice      ; Where to store input
    mov edx, 1           ; Length to read
    int 0x80             ; Interupt Kernel

    mov eax, [choice]    ; Move choice into eax
    sub eax, '0'         ; Convert from ASCII to number
    cmp eax, 0           ; If choice is 0
    je random_prompt     ; Jump to random
    cmp eax, 1           ; If choice is 1
    je str_len_prompt    ; Jump to str_len
    cmp eax, 9           ; If choice is 9
    je exit              ; Jump to exit

    jmp prompt           ; Else jump to prompt

random_prompt:
    mov eax, SYS_WRITE
    mov ebx, STDOUT
    mov ecx, random_msg
    mov edx, random_msg_len
    int 0x80

    call random          ; Call random procedure
    add eax, '0'         ; Convert from number to ASCII

    ; Write random number
    mov eax, SYS_WRITE
    mov ebx, STDOUT
    mov ecx, eax
    mov edx, 1
    int 0x80

    jmp prompt           ; Jump to prompt

str_len_prompt:
    ; Write string prompt
    mov eax, SYS_WRITE
    mov ebx, STDOUT
    mov ecx, string_prompt_msg
    mov edx, string_prompt_msg_len
    int 0x80

    ; Read string
    mov eax, SYS_READ
    mov ebx, STDIN
    mov ecx, string      ; Where to store input
    mov edx, 255         ; Max length to read
    int 0x80

    call str_len         ; Call str_len procedure

    add eax, '0'         ; Convert from number to ASCII

    jmp prompt           ; Jump to prompt


exit:
    mov eax, SYS_WRITE   ; System write
    mov ebx, STDOUT      ; System output
    mov ecx, exit_msg    ; What to write
    mov edx, exit_msg_len; Length to write
    int 0x80             ; Interupt Kernel

    mov eax, SYS_EXIT    ; System exit
    mov ebx, 0           ; Exit code
    int 0x80