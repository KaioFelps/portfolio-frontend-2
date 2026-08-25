npm ci
npm run build

PACKAGE=__package
if [ -d $PACKAGE ]; then
    rm -rf $PACKAGE
fi
mkdir $PACKAGE

cp -r .next/standalone/. $PACKAGE/_next

cp scripts/run.sh $PACKAGE
cp squarecloud.app $PACKAGE