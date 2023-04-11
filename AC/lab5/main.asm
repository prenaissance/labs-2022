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

_factorial:
    ; Save the base pointer and set up the stack frame
    push rbp
    mov  rbp, rsp
    sub  rsp, 32 ; Make room on the stack for local variables
    ; main code

    ; check if n is 0 or 1
    cmp ecx, 1
    jle .factorial_end

    ; n * factorial(n-1)
    mov edx, ecx
    dec edx
    mov ecx, edx
    call _factorial
    imul eax, edx
    mov eax, edx


.factorial_end:
    ; Restore the stack and base pointer
    mov  rsp, rbp
    pop  rbp
    ret

main:
    ; Save the base pointer and set up the stack frame
    push rbp
    mov  rbp, rsp
    sub  rsp, 32 ; Make room on the stack for local variables
    ; main code

    ; call factorial with 5

    mov rcx, 4
    call _factorial
    mov rcx , factorial_result
    mov rdx, rax
    call printf

    ; Restore the stack and base pointer
    mov  rsp, rbp
    pop  rbp
    xor  eax, eax ; Set the return value to 0
    ret
