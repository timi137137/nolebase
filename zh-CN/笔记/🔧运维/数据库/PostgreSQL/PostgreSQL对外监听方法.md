---
tags:
  - 分类/软件
  - 分类/运维
  - 运维/数据库
  - 开发/基建
---
# PostgreSQL对外监听方法

其实并没有什么难得，和其他数据库差不多，把默认本地监听改成监听全部：
```bash
vi /etc/postgresql/{版本号}/main/postgresql.conf
```
记得把注释符号去掉，然后保存。
![[Pasted image 20260512135644.png]]

```bash
service postgresql restart
# 两种重启方法都可以
systemctl restart postgresql
```

### 关于限制访问IP范围

对于很多情况下或许会想着限制哪些IP地址可以访问我们的数据库，那么只需要在指定配置文件中添加代码即可：
```bash
vi /etc/postgresql/{版本号}/main/pg_hba.conf

# 在最后面添加以下代码可以实现仅允许A类地址（10.0.0.0）访问
host all all 10.0.0.1/8 scram-sha-256
# 这个代码含义为，允许主机上指定IP段的所有用户访问所有数据库并且通过指定方法加密
```

![[Pasted image 20260512135944.png]]