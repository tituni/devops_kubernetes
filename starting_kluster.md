## Starting a cluster

```cmd 
    k3d cluster create -a 2
```
```cmd
    k3d cluster stop
    k3d cluster start
```

## Deployment

```cmd
    kubectl create deployment hashgenerator-dep --image=jakousa/dwk-app1 
    kubectl get pods
```

## Manifests

```cmd
    kubectl apply -f manifests
    kubectl delete -f manifests
```

## Port forwarding (temporally for dev)

```cmd
    kubectl port-forward to-do-xxxxxxxxxxx 3004:3001
```

## Getting configs for monitor

```cmd
    kubectl config view --minify --raw
```

## Cluster delete, start new with LB

```cmd
    k3d cluster delete
    k3d cluster create --port 8083:30080@agent:0 -p 8082:80@loadbalancer --agents 2
```

## Persistent volume 

```cmd
    docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
```

## Debug

```cmd
    kubectl get svc
    kubectl get ing
    kubectl get pvc
    kubectl describe pods xxxxxxxxxxxxxx
    kubectl logs podnamexxxxx -c containernamexxxx
    kubectl get events --sort-by=.metadata.creationTimestamp
```

## Namespace

```cmd
    kubectl create namespace example-namespace
```

## Install tools

```cmd
    scoop bucket add main
    scoop install main/kubens main/kubectx
```

## configmap

- create:
```cmd
    kubectl create configmap exercises.infofile --from-file=information.txt
    kubectl create configmap exercises.message --from-literal="MESSAGE=hello world"
    kubectl describe configmaps exercises.message
    kubectl get configmaps exercises.message -o yaml
```

- edit

```cmd
     kubectl edit configmap project.database
```

## Gateway

```cmd
    kubectl get gateway logs-gateway --namespace exercises
```