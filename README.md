<a id="readme-top"></a>
<!-- markdownlint-disable-file -->
<p align="center">
  <img width="150px" src="./src/assets/icds-logo.png" alt="Logo of the Intelligence Community Design System" loading="lazy">
</p>
<h3 align="center">ICDS Test Application</h3>

  <p align="center">
    Test project that is used to write true E2E tests using ICDS (@ukic/react) components.
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-icds">About the ICDS</a>
    </li>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#built-with">Built with</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

## About the ICDS
The [Intelligence Community Design System](https://design.sis.gov.uk) helps the United Kingdom's Intelligence Community (MI6, GCHQ, MI5, and HMGCC, our national security partner, and additional partners) to quickly build powerful capabilities that are accessible and easy to use.

This is a joint project led by [MI6](https://www.sis.gov.uk), working with [GCHQ](https://www.gchq.gov.uk), [MI5](https://www.mi5.gov.uk) and [HMGCC](https://www.hmgcc.gov.uk) (our national security partner).

<p align="center">
  <img src="./src/assets/icds-orgs.png" alt="SIS (MI6), GCHQ, MI5 and HMGCC logos" loading="lazy">
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## About the project

![ICDS Test App Screen Shot][product-screenshot]



<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built with

* [![React][React.js]][React-url]
* [![Vite][Vitejs.dev]][Vite-url]
* [![Cypress][cypress.io]][Cypress-url]
* [![React Testing Library][ReactTestingLibrary]][RTL-url]
* [![Jest][jestjs.io]][Jest-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting started

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