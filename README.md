<a id="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/mi6/ic-ui-kit/">
    <img src="./src/assets/sis-gh-banner.png" alt="IC Community Banner" width="1000" height="200">
  </a>

   <h3 align="center">ICDS Test Application</h3>

  <p align="center">
    Test project that is used to write true E2E tests using ICDS (@ukic/react) components.
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

## About The Project

![ICDS Test App Screen Shot][product-screenshot]



<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Vite][Vitejs.dev]][Vite-url]
* [![Cypress][cypress.io]][Cypress-url]
* [![React Testing Library][ReactTestingLibrary]][RTL-url]
* [![Jest][jestjs.io]][Jest-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

Run the following steps to get the ICDS test app up and running.

### Prerequisites

This project uses Node.
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Install NPM packages
   ```sh
   npm install
   ```
2. Run the development environment
   ```sh
   npm run develop
   ```
   Navigate to the localhost port
3. Run the Jest tests
   ```sh
   npm run jest
   ```
4. Run the Cypress tests
   ```sh
   npm run cypress:open
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[banner]: ./src/assets/sis-gh-banner.png
[product-screenshot]: ./src/assets/image-1.png
[Vitejs.dev]: https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E
[Vite-url]: https://vitejs.dev/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Cypress.io]: https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white
[Cypress-url]: https://www.cypress.io/
[ReactTestingLibrary]: https://img.shields.io/badge/react%20testing%20library-0088CC?style=for-the-badge&logo=reactos&logoColor=white
[RTL-url]: https://testing-library.com/docs/react-testing-library/intro/
[Jestjs.io]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/