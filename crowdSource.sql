\echo 'Delete and recreate crowdSource db?'
\prompt 'Return for yes or control-C to cancel > ' 
DROP DATABASE IF EXISTS crowdSource;

CREATE DATABASE crowdSource;

\connect crowdSource
\i crowdSource-setup.sql
-- \i crowdSource-seed.sql
\echo 'Delete and recreate crowdSource_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo
DROP DATABASE IF EXISTS crowdSource_test;

CREATE DATABASE crowdSource_test;

\connect crowdSource_test
\i crowdSource-setup.sql
