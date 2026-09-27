---
tags:
  - 分类/运维
  - 运维/数据库
---
# PostgreSQL创建一个备份用户

起因是有这么一个需求：`定时给PostgreSQL数据库进行备份` 正常来说这种需求非常简单。但既然我拿出来说，那就肯定是遇到点什么奇怪的事情了。

**PostgreSQL的权限管理严格的令人发指。**

虽然这是一个好事没错，但对于自动备份来说，那每次新建数据库或者表就要重新给一次权限，那不如给我打死算了。因此我琢磨出了以下的SQL语句，应该是没问题的~

```sql
-- 将全局只读角色赋予 backup 用户
GRANT pg_read_all_data TO backup;
-- 如果未来由 postgres 用户创建了新表，自动给 backup 赋予 SELECT 权限
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT ON TABLES TO backup;
-- 撤销 backup 用户在 public 命名空间的 CREATE 权限
REVOKE CREATE ON SCHEMA public FROM backup;
-- 强制限制该用户只能进行只读事务
ALTER USER backup SET default_transaction_read_only = on;
-- 赋予专业的内置备份白名单角色（允许读取 pg_dump 所需的系统内部统计信息）
GRANT pg_read_all_stats TO backup;
```
