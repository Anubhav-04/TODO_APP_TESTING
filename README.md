## Added two project todo_backend and todo_frontend

# Start the backend in the todo_backend  repo

```bash
npm run dev

```

# Start the frontend in the todo_frontend repo

```bash
npm run start
```

# To run the tests in the todo_backend repo

```bash
npm run test
python3 Integration_test.py
```

# To run the load testing using Jmeter in the root of the project run the below command
* * set ResultTree.jmx ip address to local ip
```js
<stringProp name="HTTPSampler.domain">ip address</stringProp>
```

```bash
jmeter -n -t ResultsTree.jmx
```

* * Check output file and jmeter.log for details

* *  Or configure the jmeter GUI

* * Install jmeter and then set accordingly

* * host local

