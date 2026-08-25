npm ci
npm run build

PACKAGE=__package
if [ -d $PACKAGE ]; then
    rm -rf $PACKAGE
fi
mkdir $PACKAGE

cp -r .next/standalone/.next/. $PACKAGE/_next
cp .next/standalone/package.json $PACKAGE
cp .next/standalone/server.js $PACKAGE

cp scripts/run.sh $PACKAGE
cp squarecloud.app $PACKAGE