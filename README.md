![Featured](https://github-production-user-asset-6210df.s3.amazonaws.com/26682297/246461706-ef37e398-3062-4a47-a475-660df5267519.jpg)

EconomiX is an application designed to record and measure your earnings and expenses.

- [Technologies](#technologies)
- [How to run](#how-to-run)
- [Hygraph](#hygraph)
- [Environment variables](#environment-variables)
- [Preview](#preview)
- [License](#license)

<a id="technologies"></a>

## ✨ Technologies

This project was developed with the following technologies:

- TypeScript
- React
- Next.js
- Next-pwa
- Next-auth
- GraphQl
- Apollo Client
- Tailwind
- Recharts

<a id="how-to-run"></a>

## 🚀 How to run

- Clone the repository

```bash
git clone https://github.com/igorssc/economix.git

cd economix
```

- Install dependencies

```bash
yarn

# or

npm init
```

- Put your environment variables in a file .env.local at the root of the project

- Start the server

```bash
yarn dev

# or

npm run dev
```

You can now access [`localhost:3000`](http://localhost:3000) from your browser. An application layout template:

![image](https://github.com/igorssc/economix/assets/26682297/5fb8f905-3338-4f0f-af5a-3acb0aac35b4)

This project utilizes the power of Recharts, a robust charting library for React, to create visually appealing and interactive charts. Recharts offers a wide range of chart types, including line charts, bar charts, pie charts, and more.

In this project, Recharts was employed to provide insightful visualizations for the recorded earnings and expenses. It offers a seamless integration with React components, making it convenient to render data-driven charts with minimal configuration.

To learn more about how to use Recharts and explore its extensive features, you can refer to the official documentation: [Recharts Documentation](https://recharts.org/)

<a id="hygraph"></a>

## 🎲 Hygraph

To configure the content storage service, you must follow a few steps:

1. Go to the website <https://hygraph.com> and create a new project;

2. Create a schema model, named "Record", as in the image below:

<img src="https://github.com/igorssc/economix/assets/26682297/f9512253-f4c7-4c89-a7bd-36ddc49c6224" width="600em">

3. In the project settings, copy your Master Environment Url:

<img src="https://user-images.githubusercontent.com/26682297/191612090-d52375b4-2cdf-4151-8edd-8dfab439f5da.png" width="600em">

> It will be used in the environment variables

4. Create an Permanent Access Token:

<img src="https://user-images.githubusercontent.com/26682297/191612108-5abae9a8-be7a-475b-8c88-a64d8ee9dfdf.png" width="600em">

5. Change the permissions of your permanent access token, and leave it as below:

<img src="https://github.com/igorssc/economix/assets/26682297/cc073d9d-7fc8-4603-beda-9f24982878a0" width="600em">

<a id="environment-variables"></a>

## 🔐 Environment variables

In this project, `environment variables are used`, to connect with the content storage service [hygraph](https://hygraph.com/).

For the correct operation of the system, the following environment variables must be used:

```
GOOGLE_CLIENT_ID=id-of-your-google-application
GOOGLE_CLIENT_SECRET=your-google-secret-token

FACEBOOK_CLIENT_ID=id-of-your-google-application
FACEBOOK_CLIENT_SECRET=your-facebook-secret-token

NEXT_PUBLIC_HYGRAPH_URI=your-hygraph-master-environment-url
NEXT_PUBLIC_HYGRAPH_CLIENT_SECRET=your-hygraph-secret-token

NEXTAUTH_SECRET=secret-token-for-your-application-in-production
```

Make sure to replace GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, and other relevant fields with your own Google and Facebook configuration information, along with other necessary environment variables.

NextAuth is a flexible authentication library for Next.js applications that supports various authentication providers, including Google and Facebook. To implement the Google and Facebook login, you need to provide the corresponding client IDs and secret tokens in the environment variables.

Please refer to the NextAuth documentation for more detailed instructions on setting up NextAuth with Google and Facebook authentication providers.

<a id="preview"></a>

## 🪄 Preview

Access <https://economix.vercel.app>

<a id="license"></a>

## 📝 License

This project is under MIT licence. See the archive [LICENSE](LICENSE.md) to more details.

---

Made with 💜 by [IGS Design](https://igsdesign.com.br) - Igor Santos 👋
