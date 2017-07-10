
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('voters', function(table) {
     table.increments('id').primary();
     table.string('VOTER_ID')
     table.string('COUNTY_CODE')
     table.string('COUNTY')
     table.string('LAST_NAME')
     table.string('FIRST_NAME')
     table.string('MIDDLE_NAME')
     table.string('NAME_SUFFIX')
     table.string('VOTER_NAME')
     table.string('STATUS_CODE')
     table.string('PRECINCT_NAME')
     table.string('ADDRESS_LIBRARY_ID')
     table.string('HOUSE_NUM')
     table.string('HOUSE_SUFFIX')
     table.string('PRE_DIR')
     table.string('STREET_NAME')
     table.string('STREET_TYPE')
     table.string('POST_DIR')
     table.string('UNIT_TYPE')
     table.string('UNIT_NUM')
     table.string('RESIDENTIAL_ADDRESS')
     table.string('RESIDENTIAL_CITY')
     table.string('RESIDENTIAL_STATE' )
     table.string('RESIDENTIAL_ZIP_CODE')
     table.string('RESIDENTIAL_ZIP_PLUS')
     table.string('EFFECTIVE_DATE')
     table.string('REGISTRATION_DATE')
     table.string('STATUS')
     table.string('STATUS_REASON')
     table.string('BIRTH_YEAR')
     table.string('GENDER')
     table.string('PRECINCT')
     table.string('SPLIT')
     table.string('VOTER_STATUS_ID')
     table.string('PARTY')
     table.string('PARTY_AFFILIATION_DATE')
     table.string('PHONE_NUM')
     table.string('MAIL_ADDR1')
     table.string('MAIL_ADDR2')
     table.string('MAIL_ADDR3')
     table.string('MAILING_CITY')
     table.string('MAILING_STATE')
     table.string('MAILING_ZIP_CODE')
     table.string('MAILING_ZIP_PLUS')
     table.string('MAILING_COUNTRY')
     table.string('SPL_ID')
     table.string('PERMANENT_MAIL_IN_VOTER')
     table.string('CONGRESSIONAL')
     table.string('STATE_SENATE')
     table.string('STATE_HOUSE')


     table.timestamps(true, true);
   })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('voters')
  ])
};
