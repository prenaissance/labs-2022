bits 64
default rel

segment .data
    msg db "Hello world!", 0xd, 0xa, 0

segment .text
global main

extern printf

main:
    ; Save the base pointer and set up the stack frame
    push    rbp
    mov     rbp, rsp
    sub     rsp, 32 ; Make room on the stack for local variables

    lea     rcx, [msg] ; set up the first argument for printf to the address of msg
    call    printf

    mov     rsp, rbp ; Restore the stack pointer
    pop     rbp ; Restore the base pointer
    xor     eax, eax ; Set the return value to 0
    ret