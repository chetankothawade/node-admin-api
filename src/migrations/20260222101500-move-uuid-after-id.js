'use strict';

export default {
  async up() {
    // PostgreSQL does not support MySQL-style column repositioning (`AFTER id`).
    // UUID columns are already created and constrained by the previous migration.
  },

  async down() {
    // No-op: column order is not represented as a reversible schema change in PostgreSQL.
  },
};
