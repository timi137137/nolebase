---
tags:
  - 分类/运维
  - 分类/软件
  - 基础设施
  - 软件/Gitlab
---
# 裸机安装Gitlab Runner

安装Gitlab Runner的方式千奇百怪，这边先讲述直接在裸机上安装。

> [!note] 
> 不推荐在虚拟机中套虚拟机，因此裸机安装是比较合适的方案。


## Linux 一键脚本安装

```bash
# 一键添加Gitlab Runner仓库
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" -o script.deb.sh
# 执行脚本
bash script.deb.sh
# 一键安装最新版本
apt install gitlab-runner
# 更新 Gitlab Runner
apt update
apt install gitlab-runner
```

## 配置 Runner

具体请看：[[如何配置Gitlab Runner]]