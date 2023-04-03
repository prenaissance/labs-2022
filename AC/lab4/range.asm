bits 64
%define N 10
section .data
    num_format db "%d", 10, 0 ; format string for printing numbers with newline

section .text
    global main
    extern printf

main:
    ; Save the base pointer and set up the stack frame
    push rbp
    mov  rbp, rsp
    sub  rsp, 32 ; Make room on the stack for local variables

    ; Make a counter variable and initialize it to 0
    mov  rbx, 0

    ; Loop through numbers 0 to 10
    .loop:
        ; Move the arguments to the corresponding registers on windows and call printf
        lea  rcx, num_format
        mov  rdx, rbx
        call printf
        inc  rbx ; Increment the counter
        cmp  rbx , N; Check if the counter is equal to N
        jle .loop; If not, jump to the loop label
        ; If it is, exit the loop
    
    ; Restore the stack and base pointer
    mov  rsp, rbp
    pop  rbp
    xor  eax, eax ; Set the return value to 0
    ret
