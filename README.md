## To run from CMD

In project folder run

npm start

## Build Docker

In project folder run

docker build -t {image name} . 

docker run -p 3000 {image name}  


# TMDB DevOps Challenge

## Challenge 1: Implement CI Pipeline

### Overview
In this challenge, we implement a Continuous Integration (CI) pipeline for the repository `https://github.com/salawadhi/tmdb-devops-challenge/` using Jenkins. The CI pipeline includes stages for building the code, linting, running tests, and packaging the code as a container.

### Steps to Implement CI Pipeline

1. **Fork the Repository**:
   - Go to the repository: `https://github.com/salawadhi/tmdb-devops-challenge/`
   - Click the "Fork" button on the top right to create a copy under your GitHub account.

2. **Set Up Jenkins**:
   - Install Jenkins on your local machine or a server.
   - Install necessary plugins (e.g., Git, Docker Pipeline).
   - Create a new pipeline job in Jenkins and configure the repository URL and credentials.

3. **Create Jenkinsfile**:
   Create a file named `Jenkinsfile` in the root directory of your forked repository with the following content:

4. **Push Jenkinsfile to Repository**:
   ```bash
   git add Jenkinsfile
   git commit -m "Add CI pipeline configuration"
   git push origin main
   ```

5. **Configure Cloud Deployment**:
   - Set up a cloud deployment environment (e.g., AWS, GCP) to run the CI pipeline.
   - Ensure the cloud environment has access to the repository and necessary build tools.

6. **Trigger the CI Pipeline**:
   - Navigate to the Jenkins dashboard.
   - Select the pipeline job.
   - Click "Build Now" to trigger the pipeline.
   - Monitor the console output for status updates.

### How to Operate the CI Pipeline

#### Jenkins:

1. Navigate to the Jenkins dashboard.
2. Select the pipeline job.
3. Click "Build Now" to trigger the pipeline.
4. Monitor the console output for status updates.



## Challenge 2: Run Nginx with Ansible

### Overview
In this challenge, we automate the deployment of an Nginx server and the TMDB application using Ansible. The deployment is performed on a cloud provider such as AWS, GCP, or Azure.

### Steps to Implement the Solution

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/salawadhi/tmdb-devops-challenge/
   cd tmdb-devops-challenge
   ```

2. **Create Ansible Playbook**:
   Create a file named `tmdb-iac.yaml`.

3. **Create Ansible Inventory File**:
   Create an inventory file named `hosts` to specify the target servers:

   ```ini
   [webservers]
   your_server_ip ansible_user=your_user
   ```

4. **Provision Cloud Infrastructure**:
   Use your cloud provider's CLI or console to provision a VM instance. Make sure the instance allows HTTP/HTTPS traffic.

5. **Run Ansible Playbook**:
   Execute the playbook to set up Nginx and deploy the application:

   ```bash
   ansible-playbook -i hosts tmdb-iac.yaml
   ```

### How to Operate the Deployed Application

1. **Access the Application**:
   Open your browser and navigate to `http://<server-ip>`. You should see the TMDB application served by Nginx.

2. **Monitor Nginx**:
   To check the status of the Nginx service, use the following command on the server:
   ```bash
   sudo systemctl status nginx
   ```

3. **Update Application**:
   To update the application, pull the latest changes from the repository and re-run the relevant Ansible tasks:

   ```bash
   cd /var/www/tmdb
   git pull origin main
   npm install
   npm run build
   sudo systemctl restart nginx
   ```