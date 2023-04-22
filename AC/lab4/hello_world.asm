bits 64

section .data
    hello db 'Hello, World!',0

section .text
    global main

main:
    ; write 'Hello, World!' to stdout
    mov eax, 4 ; system call for 'write'
    mov ebx, 1 ; file descriptor for stdout
    mov ecx, hello ; address of string to write
    mov edx, 13 ; number of bytes to write
    int 0x80 ; call kernel

    ; exit program with 0 status code
    mov eax, 1 ; system call for 'exit'
    xor ebx, ebx ; return 0 status code
    int 0x80 ; call kernel
