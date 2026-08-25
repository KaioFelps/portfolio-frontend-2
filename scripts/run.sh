swap_if_incoming() {
    OLD=$1
    NEW=$2

    if [ ! -d "$NEW" ]; then
        return
    fi

    if [ -d "$OLD" ]; then
        rm -rf "$OLD"
    fi

    mv "$NEW" "$OLD"
}

swap_if_incoming .next _next

cp .env .next/standalone/.env
node .next/server.js