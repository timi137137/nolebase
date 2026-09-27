---
tags:
  - 分类/运维
  - 软件/Rancher
  - 软件/Kubernetes
---
# 怎么修改 CoreDNS

```bash
# 首先找到 CoreDNS 的 Config Map
kubectl -n kube-system get configmap 
# 然后修改配置文件 
kubectl -n kube-system edit configmap rke2-coredns-rke2-coredns 
# 重启 RKE2 结束 
systemctl restart rke2-server 
# 或者直接重启 CoreDNS 
kubectl rollout restart deployment -n kube-system rke2-coredns-rke2-coredns
```

> [!warning] 
> 请注意，这种修改方式在重启服务器后可能会失效。暂时未知更好的解决方案！