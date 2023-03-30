bits 64
default rel

section .data
    num1 dq 10
    num2 dq 20
    format db "Result: %ld", 10, 0

section .text
    global main
    extern printf

main:
    ; Save the base pointer and set up the stack frame
    push rbp
    mov  rbp, rsp
    sub  rsp, 32 ; Make room on the stack for local variables

    ; Load num1 into rax
    mov  rax, [num1]

    ; Add num2 to rax
    add  rax, [num2]

    ; Move the format string and result to the stack
    mov  rcx, format ; format string address goes in rcx
    mov  rdx, rax   ; result goes in rdx (second integer argument to printf)

    ; Call printf
    xor  eax, eax   ; set EAX to 0 (first integer argument to printf)
    call printf

    ; Clean up and exit
    mov  rsp, rbp
    pop  rbp
    xor  eax, eax   ; set return value to 0
    ret
