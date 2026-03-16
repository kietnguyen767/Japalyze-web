-- CreateTable
CREATE TABLE "DictionaryEntry" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL DEFAULT 'ja',
    "lemma" TEXT NOT NULL,
    "reading" TEXT,
    "romaji" TEXT,
    "posTag" TEXT NOT NULL,
    "meaningVi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DictionaryEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExampleSentence" (
    "id" TEXT NOT NULL,
    "jp" TEXT NOT NULL,
    "romaji" TEXT,
    "vi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entryId" TEXT NOT NULL,

    CONSTRAINT "ExampleSentence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DictionaryEntry_lang_idx" ON "DictionaryEntry"("lang");

-- CreateIndex
CREATE INDEX "DictionaryEntry_lemma_idx" ON "DictionaryEntry"("lemma");

-- CreateIndex
CREATE INDEX "DictionaryEntry_reading_idx" ON "DictionaryEntry"("reading");

-- CreateIndex
CREATE INDEX "DictionaryEntry_romaji_idx" ON "DictionaryEntry"("romaji");

-- CreateIndex
CREATE INDEX "DictionaryEntry_posTag_idx" ON "DictionaryEntry"("posTag");

-- CreateIndex
CREATE INDEX "ExampleSentence_entryId_idx" ON "ExampleSentence"("entryId");

-- AddForeignKey
ALTER TABLE "ExampleSentence" ADD CONSTRAINT "ExampleSentence_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "DictionaryEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
