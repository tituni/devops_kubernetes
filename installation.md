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

### Helm

```cmd
    scoop install helm
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo add stable https://charts.helm.sh/stable
    helm repo update
```

- Commands:

```cmd
    helm delete [name]
    helm list -n prometheus
```

### Prometheus

```cmd
    kubectl create namespace prometheus
    helm install prometheus-community/kube-prometheus-stack --generate-name --namespace prometheus
```

### Connect prometheus - grafana

```cmd
    kubectl -n prometheus port-forward [your_stack_name] 3000
```

- Access http://localhost:3000(opens in a new tab) with a browser and use the credentials admin / prom-operator

### Change admin password for grafana

- namespace is: prometheus
- new password is: admin123

```cmd
    kubectl exec --namespace prometheus -it $(kubectl get pods --namespace prometheus -l "app.kubernetes.io/name=grafana" -o jsonpath="{.items[0].metadata.name}") -- grafana cli admin reset-admin-password admin123
```

### Add loki

```cmd
    helm repo add grafana https://grafana.github.io/helm-charts
    helm repo update
    kubectl create namespace loki-stack
    helm upgrade --install loki --namespace=loki-stack grafana/loki-stack --set loki.image.tag=2.9.3
```

### Google cloud

```cmd
    gcloud container clusters create dwk-cluster --zone=europe-north1-b --cluster-version=1.32 --disk-size=32 --num-nodes=3 --machine-type=e2-micro
```