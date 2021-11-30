\echo 'Delete and recreate crowdSource db?'
\prompt 'Return for yes or control-C to cancel >' foo
DROP DATABASE IF EXISTS crowdsource;

CREATE DATABASE crowdsource;

\connect crowdsource
\i crowdsource-setup.sql
-- \i crowdsource-seed.sql
\echo 'Delete and recreate crowdsource_test db?'
\prompt 'Return for yes or control-C to cancel >' foo
DROP DATABASE IF EXISTS crowdsource_test;

CREATE DATABASE crowdsource_test;

\connect crowdsource_test
\i crowdsource-setup.sql
\i crowdsource-seed.sql
