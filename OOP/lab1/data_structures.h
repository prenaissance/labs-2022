#include <stdio.h>
#include <stdlib.h>

#ifndef DATA_STRUCTURES_H
#define DATA_STRUCTURES_H

typedef struct linkedList
{
    int data;
    struct linkedList *next;
} linkedList;

linkedList *createNode(int data)
{
    linkedList *node = (linkedList *)malloc(sizeof(linkedList));
    node->data = data;
    node->next = NULL;
    return node;
}

typedef struct stack
{
    int size;
    linkedList *top;
    linkedList *bottom;
    void (*push)(struct stack *, int);
    int (*pop)(struct stack *);
    int (*peek)(struct stack *);
    int (*isEmpty)(struct stack *);
    void (*print)(struct stack *);
    int *(*toArray)(struct stack *);
    void (*dispose)(struct stack *);
} stack;

void push(stack *self, int data)
{
    linkedList *node = createNode(data);
    if (self->top == NULL)
    {
        self->top = node;
        self->bottom = node;
    }
    else
    {
        node->next = self->top;
        self->top = node;
    }
    self->size++;
}

int pop(stack *self)
{
    if (self->top == NULL)
    {
        return -1;
    }
    int data = self->top->data;
    linkedList *temp = self->top;
    self->top = self->top->next;
    free(temp);
    self->size--;
    return data;
}

int peek(stack *self)
{
    if (self->top == NULL)
    {
        return -1;
    }
    return self->top->data;
}

int isEmpty(stack *self)
{
    return self->top == NULL;
}

int *toArray(stack *self)
{
    int *arr = (int *)malloc(sizeof(int) * self->size);
    linkedList *temp = self->top;
    int i = 0;
    while (temp != NULL)
    {
        arr[i] = temp->data;
        temp = temp->next;
        i++;
    }
    // reverse array
    for (int i = 0; i < self->size / 2; i++)
    {
        int temp = arr[i];
        arr[i] = arr[self->size - i - 1];
        arr[self->size - i - 1] = temp;
    }
    return arr;
}

void dispose(stack *self)
{
    linkedList *temp = self->top;
    while (temp != NULL)
    {
        linkedList *next = temp->next;
        free(temp);
        temp = next;
    }
    free(self);
}

void print(stack *self)
{
    linkedList *temp = self->top;
    printf("[");
    while (temp != NULL)
    {
        printf("%d, ", temp->data);
        temp = temp->next;
    }
    printf("]");
}

stack *createStack()
{
    stack *s = (stack *)malloc(sizeof(stack));
    s->size = 0;
    s->top = NULL;
    s->push = push;
    s->pop = pop;
    s->peek = peek;
    s->isEmpty = isEmpty;
    s->toArray = toArray;
    s->print = print;
    s->dispose = dispose;
    return s;
}

#endif