ENTRY_FILE := "src/index.ts"
BANNER_FILE := "src/banner.js"
OUTPUT_FILE := "dist/bbb.user.js"

watch:
    bun build "{{ENTRY_FILE}}" --banner "$(cat {{BANNER_FILE}})" --target browser --outfile "{{OUTPUT_FILE}}" --watch

build:
    bun build "{{ENTRY_FILE}}" --banner "$(cat {{BANNER_FILE}})" --target browser --outfile "{{OUTPUT_FILE}}"

serve:
    echo "Visit this URL to install the script: http://localhost:8080/bbb.user.js"
    bun run ./serve.ts
