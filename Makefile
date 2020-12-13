install:
	npm install

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm run test-coverage

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix