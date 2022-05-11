-- CreateIndex
CREATE INDEX "users_firebaseUid_created_at_idx" ON "users"("firebaseUid", "created_at" DESC);
