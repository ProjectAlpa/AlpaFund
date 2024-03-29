#!/usr/bin/env sh
set -x
set -e
ganache-cli --account="0xfb38ccf2c4838e55f48b448aa15016b7715b4af70e7247f6bd4d43b556569271,100000000000000000000" --account="0xc3203d8e203451c927be56571a79405ae0700abb7f45828ceb70c8c703e8d11a,100000000000000000000" > /dev/null &
GANACHE_PID=$!
trap "kill $GANACHE_PID" EXIT INT TERM

truffle compile
truffle migrate --network development
truffle test

npm test
ng e2e
ng lint


#(0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
#(1) 0xf17f52151ebef6c7334fad080c5704d77216b732
#(2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
