---
tags:
  - 分类/运维
  - 运维/虚拟机
  - 软件/PVE
  - 基础设施
---
# 如何给PVE虚拟机缩容

学这个的起因是因为发现公司的PVE硬盘满了，有很大一部分的虚拟机都报`io-error`错误，定睛一看发现硬盘满了进只读了，所以开始缩容。

---

## 虚拟机内的缩容

缩容某种意义上和扩容是同样的流程，只不过增加变成减少而已。

也就是说详情可以查看：[[怎么快速安全扩容？]]

只要把分区空间缩小即然后写入保存就好。

> [!warning] 
> 请注意，在缩容之前你应该使用`df -h`确认要缩容的分区有足够的空间，否则可能会引发数据丢失！


## PVE层面的缩容

> [!info] 
> 请注意，以下教程进针对`qcow2`格式的硬盘，其他格式可能并不适用。

首先关闭虚拟机，并打开服务器的终端登入。

### QCOW2格式

需要找到对应的硬盘所在地，以PVE8.4为例，通常存储在`/mnt/pve/{物理硬盘挂载名}/images/{vmid}`。

那么对应的缩容命令就是：
```bash
cd /mnt/pve/{物理硬盘挂载名}/images/{vmid}
qmeu-img resize --shrink {虚拟机硬盘名}.qcow2 {新大小带单位}
# 例如
qmeu-img resize --shrink vm-100-disk-0.qcow2 200G
```

### 逻辑卷格式

需要找到对应的硬盘所在地，以PVE8.4为例：
- `local-lvm` 通常在 `/dev/pve`

那么对应的缩容命令就是：
```bash
cd /dev/pve
lvreduce -L {新大小带单位} {vmid}
# 例如 设置硬盘大小为10G
lvreduce -L 10G vm-100-disk-0
# 例如 基于现有大小减少5G
lvreduce -L -5G vm-100-disk-1
```

### ZFS格式

ZFS格式那就简单了，找到硬盘位置只需要`zfs list`

那么对应的缩容命令就是：
```bash
zfs set volsize={新大小带单位} {硬盘挂载名}/{vmid}
# 例如 设置硬盘大小为10G
zfs set volsize=10G data/vm-100-disk-0
```

### 缩容后刷新UI

在缩容结束后务必记得执行以下命令刷新UI界面的显示，不然容易误导自己。
```bash
qm rescan --vmid {vmid}
```
执行结果如下：
![[Pasted image 20260520021258.png]]