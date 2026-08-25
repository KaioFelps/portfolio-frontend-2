npm ci
npm run build

PACKAGE=__package

if [ -d $PACKAGE ]; then
    rm -rf $PACKAGE
fi

mkdir $PACKAGE

cp scripts/run.sh $PACKAGE
cp -r .next $PACKAGE/_next
cp package.json $PACKAGE
cp package-lock.json $PACKAGE
cp -r public $PACKAGE/_public
cp next-env.d.ts $PACKAGE
cp next.config.ts $PACKAGE
cp squarecloud.app $PACKAGE
