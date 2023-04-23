bits 64
section .data
    menu db "1. Fibbonaci", 0xd, 0xa, "2. Factorial", 0xd, 0xa, "9. Exit", 0xd, 0xa, 0
    prompt db "Enter your choice: ", 0
    error db "Invalid choice", 0xd, 0xa, 0
    number_prompt db "Enter the number: ", 0
    fibbonaci_result db "The fibbonaci number is: %d", 0
    factorial_result db "The factorial number is: %d", 0

section .text
    global main
    extern printf
    extern scanf
    extern putchar

factorial:
    cmp rdi, 0  ; compare rdi with 0
    jle .base_case  ; if rdi <= 0, jump to the base case
    push rdi  ; save rdi on the stack
    dec rdi  ; decrement rdi
    call factorial  ; call factorial recursively
    pop rcx  ; restore rdi from the stack
    imul rcx, rax  ; multiply rcx (which holds the original rdi value) by the result of the recursive call
    ret  ; return with the result in rax
  .base_case:
    mov rax, 1  ; base case: return 1
    ret  ; return with the result in rax

triangle_pattern:
    push rbp
    mov rbp, rsp

    ; rdi contains n
    mov ecx, 0      ; initialize ecx to 0 (for counting rows)
    mov ebx, '*'    ; initialize ebx to the character to print
    mov edx, 1      ; initialize edx to 1 (for counting characters to print)
    mov esi, 1      ; initialize esi to 1 (for counting spaces to print)

  .next_row:
    cmp ecx, rdi    ; compare row count with n
    jge .done       ; if row count >= n, exit the loop

    ; print spaces before characters
    mov eax, ecx
    cmp eax, 0
    je .print_star
  .print_space:
    mov rdi, 0x20   ; ASCII code for space
    call putchar
    inc esi
    cmp esi, rdi
    jl .print_space

    ; print characters
  .print_star:
    mov rdi, ebx
    call putchar
    inc edx

    ; check if we've reached the end of the row
    cmp edx, ecx
    jle .next_char

    ; if we've reached the end of the row, print a newline and start a new row
    mov rdi, 0xa    ; ASCII code for newline
    call putchar
    inc ecx         ; increment row count
    mov edx, 1      ; reset character count
    mov esi, 1      ; reset space count
    jmp .next_row

  .next_char:
    ; update character to print for the next iteration
    cmp ebx, '*'
    je .increment
    dec ebx
    jmp .print_star

  .increment:
    inc ebx
    jmp .print_star

  .done:
    pop rbp
    ret

main:
    mov rdi, 5
    call triangle_pattern
    mov rax, 0
    ret
