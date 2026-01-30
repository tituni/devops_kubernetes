## Start-up of the service 

You can start manually the app in gke running this in the root folder of the the project:

```cmd
     kubectl apply -k .
```

## Analysing DBaaS and volume based database solutions (DIY)

- DBSaaS
    - pros:
        - reliable in production
        - easy to setup
        - no need to worry about DB backups or availability
        - no need to worry about updates/patches
        - deployment is easier since there is less elements (pods) to configure and debug
        - no need to worry that the volume would fill up
        - easy to migrate to bigger and better solutions or add more capacity or redundance
    - cons
        - costs more
        - might be more difficult to move to other cloud vendor (?)

- DIY
    - pros:
        - cheaper (might not be in the long run)
        - better for small setups and low availablity/reliability cases (like testing)
        - doesn't require DBaaS from the cloud vendor
    - cons
        - requires work to configure and debug in deployments
        - need to backup data manually and create persistent storage for it
        - need to run updates and patches 
        - data and code are not separate so admin needs know what they are doing
        - requires more work to be safe (encryption keys etc.)