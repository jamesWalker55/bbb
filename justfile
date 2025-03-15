ENTRY_FILE := "src/index.ts"
BANNER_FILE := "src/banner.js"
OUTPUT_FILE := "dist/bbb.user.js"

build:
    bun build "{{ENTRY_FILE}}" --banner "$(cat {{BANNER_FILE}})" --target browser --outfile "{{OUTPUT_FILE}}"

watch:
    bun build "{{ENTRY_FILE}}" --banner "$(cat {{BANNER_FILE}})" --target browser --outfile "{{OUTPUT_FILE}}" --watch

serve:
    echo "Visit this URL to install the script: http://localhost:8080/bbb.user.js"
    bun run ./serve.ts
