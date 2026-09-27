---
tags:
  - 分类/运维
  - 软件/Kubernetes
---
# 获取 Pod 时状态为 Evicted 状态

Evicted 的意思是驱逐，通常这种情况是因为 Kubernetes 节点达成了压力条件，导致驱逐。[^1]

比较常见的原因是因为根目录使用率超过了 85% （节点默认值）达到了驱逐条件，因此只要清理硬盘空间即可。

可以使用以下常用命令：
```bash
df -h / #查看根目录占用率
kubectl get pod -A # 获取所有Pod
```

[^1]: [CSDN-kubelet压力驱逐](https://blog.csdn.net/u010383467/article/details/124629591)
