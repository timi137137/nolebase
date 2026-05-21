---
tags:
  - 分类/运维
  - 运维/容器
  - 软件/Docker
---
# 定向清理Docker资源

一般来说，很大一部分教程甚至官方文档都会推荐你使用`docker system prune`来清理Docker不要的资源。

但是这个命令实际上很容易整出运维事故，以下是官方的强烈警告：
```console
WARNING! This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all dangling images
        - unused build cache
Are you sure you want to continue? [y/N] y

警告！这将会移除：
		- 全部已经停止的容器
		- 全部没有使用的网络
		- 全部没有标签的镜像
		- 没使用的构建缓存
你确定要继续吗？
```

也就是说如果你在不恰当的地方运行了这个命令，后果不亚于AI帮你运行`rm -rf`

## 定向清理资源

因为上述问题，现在我常用的是组合命令，可以根据情况来清理：

### 清理镜像

```bash
# 删除所有无标签镜像
docker rmi $(docker images -f "dangling=true" -q)
# 删除所有镜像（不管是否使用）需要停止所有容器
docker rmi $(docker images -q)
# 删除指定条件的镜像（例如包含ubuntu）
docker rmi $(docker images | grep 'ubuntu' | awk '{print $3}')
```

### 清理容器

```bash
# 停止所有运行的容器
docker stop $(docker ps -q)
# 删除所有容器
docker rm $(docker ps -a -q)
```

## 参考文献

[博客园 - 一条命令批量删除镜像和容器 - 皇帽讲绿帽带法技巧](https://www.cnblogs.com/autopwn/p/18709656)