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