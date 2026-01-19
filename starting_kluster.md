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
    kubectl apply -f manifests/deployment.yaml
    kubectl delete -f manifests/deployment.yaml
```

## Port forwarding (temporally for dev)

```cmd
    kubectl port-forward to-do-xxxxxxxxxxx 3004:3001
```

## Cluster delete, start new with LB

```cmd
    k3d cluster delete
    k3d cluster create --port 8083:30080@agent:0 -p 8082:80@loadbalancer --agents 2
```
