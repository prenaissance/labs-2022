SYS_EXIT        equ 1
SYS_READ        equ 3
SYS_WRITE       equ 4
SYS_TIME_OF_DAY equ 96
STDIN           equ 0
STDOUT          equ 1

segment .data
    ; messages for prompts
    nl db 10, 0
    nl_len equ $- nl

    menu_msg db "Select an action:", 10, "0: Random number", 10, "1: String length", 10, "9: exit", 10, 0
    menu_msg_len equ $- menu_msg

    invalid_msg db "Invalid choice! You chose ", 0
    invalid_msg_len equ $- invalid_msg

    exit_msg db "Goodbye!", 10, 0
    exit_msg_len equ $- exit_msg

    random_msg db "Random number: ", 0
    random_msg_len equ $- random_msg

    string_prompt_msg db "Enter a string: ", 0
    string_prompt_msg_len equ $- string_prompt_msg

    string_len_msg db "String length: ", 0
    string_len_msg_len equ $- string_len_msg

segment .bss
    choice resb 4    ; string to store choice input
    string resb 255  ; string to store input
    string2 resb 255 ; another buffer string

segment .text
    global _start

print_newline:
    ; Push registers to stack
    push rax
    push rbx
    push rcx
    push rdx

    ; Print a newline
    mov eax, SYS_WRITE
    mov ebx, STDOUT
    mov ecx, nl
    mov edx, nl_len
    int 0x80

    ; Pop registers from stack
    pop rdx
    pop rcx
    pop rbx
    pop rax

    ret

reverse_str:
    ; Reverses a string
    ; Input: rdi = address of string to reverse
    ;        rsi = address of string to store result

    ; Output: rsi = address of string containing result
    ;         rax = length of string

    push rsi    ; Save the address of the result string
    push rcx    ; Save any existing value of rcx on the stack
    ; Cycle through the string to count the number of characters
    xor rcx, rcx; string length
    _reverse_str_loop:
    cmp byte [rdi + rcx], 0
    je _reverse_str_done
    inc rcx
    jmp _reverse_str_loop
    _reverse_str_done:
    mov rax, rcx    ; String length
    dec rcx         ; Recrement rcx to point to the last character
    _reverse_str_copy:
    ; Traverse the string backwards and copy each character to the result string
    mov bl, [rdi + rcx]
    mov [rsi], bl
    inc rsi
    dec rcx
    cmp rcx, -1
    jne _reverse_str_copy
    ; Add a null terminator to the end of the result string
    mov byte [rsi], 0
    ; Restore register values
    pop rcx
    pop rsi
    ret

int_to_str:
    ; Convert an integer to a string
    ; Input: rdi = integer to convert
    ;        rsi = address of string to store result
    ; Output: rsi = address of string containing result
    ;         rax = length of string
    push rcx        ; Save any existing value of rcx on the stack
    push rsi        ; Save the address of the result string

    xor rcx, rcx    ; Result string length
    mov rax, rdi    ; Copy the input value to rax
    mov rdi, 10     ; Reuse as divisor
    _int_to_str_loop:
    xor rdx, rdx    ; Clear rdx
    div rdi         ; Divide rax by rbx
    push rdx        ; Push the remainder on the stack
    inc rcx         ; Increment the result string length
    cmp rax, 0      ; Compare rax to 0
    jne _int_to_str_loop
    ; Store the string length in rax
    mov rax, rcx
    ; Pop the remainders off the stack and add '0' to convert them to ASCII
    _int_to_str_pop:
    pop rdx
    add dl, '0'
    mov [rsi], dl
    inc rsi
    dec rcx
    cmp rcx, 0
    jne _int_to_str_pop
    ; Add a null terminator to the end of the result string
    mov byte [rsi], 0
    ; Restore register values
    pop rsi
    pop rcx
    ret

str_to_int:
    ; Convert a string to an integer
    ; Input: rdi = address of string to convert
    ; Output: rax = integer value
    push rcx        ; Save any existing value of rcx on the stack
    push rdi        ; Save the address of the string to convert
    xor rax, rax    ; Result
    xor rcx, rcx    ; String length
    _str_to_int_loop:
    cmp byte [rdi + rcx], 0
    je _str_to_int_done
    inc rcx
    jmp _str_to_int_loop
    _str_to_int_done:
    dec rcx         ; Decrement rcx to point to the last character
    _str_to_int_loop2:
    mov bl, [rdi + rcx]
    sub bl, '0'     ; Convert from ASCII to number
    mov rbx, 10     ; Reuse as multiplier
    mul rbx         ; Multiply rax by rbx
    add rax, rbx    ; Add the current digit to the result
    dec rcx
    cmp rcx, -1
    jne _str_to_int_loop2
    ; Restore register values
    pop rdi
    pop rcx
    ret

str_len:
    push rcx    ; Save any existing value of rcx on the stack
                ; since it will be used in the procedure
    xor rcx, rcx
_str_len_loop:
    cmp byte [rdi + rcx], 0
    je _str_len_done
    inc rcx
    jmp _str_len_loop
_str_len_done:
    mov rax, rcx    ; return value

    pop rcx
    ret

random:
    ; Get the unix time as the seed
    mov eax, SYS_TIME_OF_DAY
    mov ebx, 0
    int 0x80

    ; Use the seed to generate a random number between 1 and 55
    mov eax, 0
    mov ecx, 55
    xor edx, edx
    div ecx
    inc eax

    ret

_start:

prompt:

    ; Write menu
    mov eax, SYS_WRITE   ; System write
    mov ebx, STDOUT      ; System output
    mov ecx, menu_msg    ; What to write
    mov edx, menu_msg_len; Length to write
    int 0x80             ; Interupt Kernel

    mov eax, SYS_READ    ; System read
    mov ebx, STDIN       ; System input
    mov ecx, choice      ; Where to store input
    mov edx, 4           ; Length to read
    int 0x80             ; Interupt Kernel

    xor eax, eax         ; Clear eax
    mov al, [choice]     ; Move choice into al
    sub al, '0'          ; Convert from ASCII to number
    cmp eax, 0           ; If choice is 0
    je random_prompt     ; Jump to random
    cmp eax, 1           ; If choice is 1
    je str_len_prompt    ; Jump to str_len
    cmp eax, 9           ; If choice is 9
    je exit              ; Jump to exit

    jmp invalid          ; Else jump to invalid

random_prompt:
    mov eax, SYS_WRITE
    mov ebx, STDOUT
    mov ecx, random_msg
    mov edx, random_msg_len
    int 0x80

    call random          ; Call random procedure
    mov rdi, rax         ; Move random number into rdi
    mov rsi, string      ; Move string pointer into rsi
    call int_to_str      ; Call int_to_str procedure

    ; Write random number
    mov edx, eax
    mov eax, SYS_WRITE
    mov ebx, STDOUT
    mov ecx, string
    int 0x80

    call print_newline

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

    mov rdi, string      ; Move string pointer into rdi
    call str_len         ; Call str_len procedure

    mov rdi, rax         ; Move string length into rdi
    mov rsi, string      ; Move string pointer into rsi
    call int_to_str      ; Call int_to_str procedure

    ; Write string length message
    mov eax, SYS_WRITE
    mov ebx, STDOUT
    mov ecx, string_len_msg
    mov edx, string_len_msg_len

    ; Write string length
    mov edx, eax
    mov eax, SYS_WRITE
    mov ebx, STDOUT
    mov ecx, string

    jmp prompt           ; Jump to prompt

invalid:
    mov eax, SYS_WRITE
    mov ebx, STDOUT      
    mov ecx, invalid_msg
    mov edx, invalid_msg_len
    int 0x80

    pop rax; Restore rax
    mov eax, SYS_WRITE
    mov ebx, STDOUT
    mov ecx, choice
    mov edx, 4
    int 0x80

    jmp prompt

exit:
    mov eax, SYS_WRITE   ; System write
    mov ebx, STDOUT      ; System output
    mov ecx, exit_msg    ; What to write
    mov edx, exit_msg_len; Length to write
    int 0x80             ; Interupt Kernel

    mov eax, SYS_EXIT    ; System exit
    mov ebx, 0           ; Exit code
    int 0x80