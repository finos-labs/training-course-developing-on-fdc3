![badge-labs](https://user-images.githubusercontent.com/327285/230928932-7c75f8ed-e57b-41db-9fb7-a292a13a1e58.svg)

# training-course-developing-on-fdc3

This project is source files to accompany the FDC3 Developer Training Course.


## To Run (with FDC3 Sail)

1.  From the Command Line:
    ```
    yarn install
    yarn dev
    ```

2. Point browser at http://localhost:5000/static/tradelist/

3. You should be able to see the application start up.

4. Check out and build FDC3 Sail

```
cd ..
git checkout git@github.com:finos/FDC3-Sail.git
cd FDC3-Sail
npm i
```

5. Set the FDC3 Sail AppD record:

```
export SAIL_DIRECTORY_URL=../training-course-developing-on-fdc3/appd/basic-appd.v2.json
```

6. Start FDC3 Sail

```
npm run start
```

7.  Start

Complete the developer tutorial to integrate this with FDC3.


## Channels

- Observe that setting the workbench, the news and the pricer app to red channel means you can broadcast an instrument context and they'll all update.



## Lab 3 Steps

The FDC3 Developer Training Course is divided into modules, which are reflected in the branches of this repo:

- blah


## License

Copyright 2023 FINOS

Distributed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

SPDX-License-Identifier: [Apache-2.0](https://spdx.org/licenses/Apache-2.0)
