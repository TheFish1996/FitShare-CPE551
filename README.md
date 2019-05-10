## FitShare
- A full stack web application for trainers and trainees to have their own marketplace and platform to buy and sell plans and products.
- Built with Mongo, Python, and React
- Powered by Amazon Web Services

### Prerequisites

This project works with Python 2.7, and the AWS CLI. Testing with other platforms and version have not been implemeneed.


### Installing

Make sure you have node, python and the AWS CLI installed on your machine. Then clone this repository, navigate to front end directory and perform an npm install
For example:

```
Frontend YOUR-USERNAME$ npm install
```

There is also a list of backend dependencies in dependencies.txt that should be installed using pip on your local machine.

Lastly you must configure your AWS keys to your machine as our's will not work anymore. 


When the program starts, you can proceed to localhost:3000!

### How it works

FitShare is a super scalable full stack web application that leverages modern day data driven applications. Leveraging ReactJS as our main front end framework, we can seamlessly integrate Backend and Frontend services independent from each other to increase Developer utilization, and working on features that matter.

FitShare's backend utilizes the advantages of the modern day cloud infrastructure. Without having to spin up our own servers or purchasing bare metal and incorporating our own methods and features for redundant work, we can solely focus on our application, business model, and implementing new features.

FitShare's main business model includes uploading, sharing, and purchasing files. With the benefit of AWS S3, we have extremely scalable data storage, and great speed. With the benefit of a python backend, we have super simple and readable code for developers to follow and implement new features.

With the power of AWS DocumentDB, we now have fully scalable database clusters. With the ability to automatically scale up and scale down clusters, take backup snapshots of data, and having a global cluster available at all times, FitShare's backend infrastructure and services can be counted on being available to its customers at all times.

If FitShare was to go into production we'd spin up our services on EC2 instances, implement caching, and making our API available in front of a CDN to allow for uninterrupted services on a global level. 

FitShare aims to demonstrate the power of the cloud and python to inspire individuals to build up and tear down applications/infrastructure with very little cost, and immense speed. 

### Remarks
Database, keys, and passwords will be removed but hope you enjoy the video, and it was a pleasure taking this class this semester.