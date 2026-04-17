---
tags:
  - 分类/软件
  - 分类/运维
  - 运维/数据库
  - 开发/基建
---
## Ubuntu / Debian
实际上目前 PostgreSQL 已经可以通过系统附带的包管理器直接安装，因此命令如下：
```bash
apt install postgresql
```

一行命令下去就会全自动安装到宿主机上。目前不推荐把数据库上到K8S上，问我为啥我不知道。
![[Pasted image 20260417232749.png]]

## Ubuntu的小习惯

Ubuntu喜欢在每个版本中**快照**某个版本的PostgreSQL，这是一个很容易导致多个系统环境不一致的问题。这种情况下就要上指定版本的APT仓库了：
```bash
apt install -y postgresql-common  
/usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
```
这两行代码是用来全自动配置官方仓库的，然后执行以下指令（可以把18换成其他版本号）：
```bash
apt install postgresql-18
```
这样运行就可以安装指定版本的数据库了，并且可以无缝升级（前提是没数据）