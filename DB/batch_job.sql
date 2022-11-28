-- haven't tested it, took straight out of
-- https://learn.microsoft.com/en-us/sql/ssms/agent/create-a-job?view=sql-server-ver16

exec dbo.sp_add_job
    @job_name = N'batchJob';
go

exec dbo.sp_add_jobstep
    @job_name = N'batchJob',
    @step_name = N'batchStep',
    @subsystem = N'TSQL',
    @command = N'exec batchSp';
    @retry_attempts = 999,
    @retry_interval = 3;
go

exec dbo.sp_add_schedule
    @schedule_name = N'batchSchedule',
    @freq_type = 4,
    @freq_interval = 3;

exec dbo.sp_add_jobserver
    @job_name = N'batchJob',
    @server_name = N'localhost';
go