-- check if procedure exists
if exists (select 1 from sys.procedures where Name = 'batchSp')
begin
    drop procedure batchSp
end
go

create procedure batchSp
as
begin
    with Batch as (
        select *
        from J$SRC_TXN
        where TXN_SRC_KEY = 0
    )

    update J#SRC_TXN
    set CONSUME_F = 1
    from Batch
    where J#SRC_TXN.TXN_SRC_KEY = Batch.TXN_SRC_KEY

    waitfor delay '00:00:15'

    insert into TXN(TXN_ID, TXN_SRC_KEY, AC_ID, PD_ID, SRC_STM_ID, QTY, CCY, AMOUNT, TD, BKG_DT)
    select
        next value for TXN_SEQ,
        SRC_TXN.TXN_SRC_KEY,
        AC_LKP.AC_ID,
        PD_LKP.PD_ID,
        SRC_STM_LKP.SRC_STM_ID,
        SRC_TXN.SHARES,
        SRC_TXN.CCY,
        case
            when SRC_TXN.CCY = 'USD' then SRC_TXN.SHARES
            else SRC_TXN.SHARES / EXCH_RATE.RATE
        end,
        SRC_TXN.BUS_DY,
        case
            when SRC_TXN.BKG_DT is null then SRC_TXN.BUS_DY
            else SRC_TXN.BKG_DT
        end
    from SRC_TXN
    left join AC_LKP on AC_LKP.AC_NUM = SRC_TXN.AC_NUM and AC_LKP.ACTV_F = 'Y'
    left join PD_LKP on PD_LKP.PD_NUM = SRC_TXN.PD_NUM and SRC_TXN.BUS_DY between PD_LKP.EFF_DT and PD_LKP.END_DATE
    left join SRC_STM_LKP on SRC_STM_LKP.SRC_STM_CODE = SRC_TXN.SRC_CODE
    left join EXCH_RATE on EXCH_RATE.CCY_CODE = SRC_TXN.CCY and SRC_TXN.BUS_DY between EXCH_RATE.EFF_DT and EXCH_RATE.END_DATE
    where SRC_TXN.TXN_SRC_KEY in (select TXN_SRC_KEY from Batch)

    waitfor delay '00:00:15'

    insert into TXN_EXCP(TXN_SRC_KEY, EXCP_CODE_ID)
    select
        SRC_TXN.TXN_SRC_KEY,
        EXCP_CODE.EXCP_CODE_ID
    from SRC_TXN
    left join AC_LKP on AC_LKP.AC_NUM = SRC_TXN.AC_NUM and AC_LKP.ACTV_F = 'Y'
    left join PD_LKP on PD_LKP.PD_NUM = SRC_TXN.PD_NUM and SRC_TXN.BUS_DY between PD_LKP.EFF_DT and PD_LKP.END_DATE
    left join EXCP_CODE on EXCP_CODE.EXCP_CODE_NM = case
        when AC_LKP.AC_ID is null then 'ACEXCP'
        when PD_LKP.PD_ID is null then 'PDEXCP'
    end
    where SRC_TXN.TXN_SRC_KEY in (select TXN_SRC_KEY from Batch)

    waitfor delay '00:00:15'

    delete from J$SRC_TXN
    where J$SRC_TXN.TXN_SRC_KEY in (select TXN_SRC_KEY from Batch)

end