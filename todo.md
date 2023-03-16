Add logo screenshot to README
Caching inside the nginx



# workdir is dir created in the container. If we mention a workdir at root docker will store all files we COPY directly in root. workdir has nothing to do with the directory name in repo folder structure.


I have a project description as -
We've a IoT project in our company called spectra. Spectra gives users to manage IoT sensors in a interactive way. It gives dashboards and IAM and ability to group sensors and their data under a entity called as Site. The way it works is client will provide the raw data source database from which spectra gets the data, understands that data according to the product for which the particular data is mapped to. The data gets stored in spectra's mongoDB database with some added enrichments. This data will be used to build dashboard and other analytics.

All above paragraph mentions the spectra. We want to help new potential clients or just someone who wants to get demo of spectra with website that automatically creates demo entities required to see basic dashboards and analytics. I've named it `spectraXpress`.

Below are the stages/parts of the spectraXpress:
# we will be having spectra running locally in docker container both spectra frontend as well as backend.
# Users will provide email and password and login
# We'll create user account in spectraXpress database and also create a default fake tenant account
# Fake tenant account is needed because all fake data that spectra uses will be stored under this tenant account.
# Now user will follow simple steps that'll create a demo
# steps are like follow:
1. We will ask user to provide a name for the demo
2. Product configuration for which they want to see the demo
3. IAM configuration for the demo
4. Site configuration for the demo
# Once user provides all the above information we will create a demo for them and redirect or provide a link to the demo.

Now Can you create a introductory homepage that tells about how spectraXpress helps users to get demo of spectra?
