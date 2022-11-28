if exists (select 1 from sys.triggers where Name = 'ExtractTrg')
begin
    drop trigger ExtractTrg
end
go

create trigger ExtractTrg
on SRC_TXN
after insert, update, delete
as
begin
    insert into J$SRC_TXN(TXN_SRC_KEY, CONSUME_F, ACTION_F)
    select TXN_SRC_KEY, 0, 'I'
    from inserted
    where TXN_SRC_KEY not in (select TXN_SRC_KEY from deleted)
    union all
    select TXN_SRC_KEY, 0, 'U'
    from inserted
    where TXN_SRC_KEY in (select TXN_SRC_KEY from deleted)
    union all
    select TXN_SRC_KEY, 0, 'D'
    from deleted
    where TXN_SRC_KEY not in (select TXN_SRC_KEY from inserted)
end
go