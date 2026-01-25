## Install kubectl and k3d

Make sure you have Docker installed

### Kubectl

[For Windows:](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/)

Using WGET:

```cmd
    winget install -e --id Kubernetes.kubectl
```

Install also minicube:

[minikube start](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fwindows%2Fx86-64%2Fstable%2F.exe+download)

```cmd
    minikube start
```

### m3d

[get m3d](https://github.com/k3d-io/k3d#get)

Run in bash:

```bash
    curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash
```

### Other m3d install

Install Scoop:

```cmd
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

```cmd
    scoop install k3d
```