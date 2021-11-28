const { BadRequestError } = require("../expressError");

/**
 * Helper function to help with sql update queries so that
 * the columns to be updated do not need to be hard-coded.
 *
 * The column names are joined into one string to provide to the
 * sql query.
 *
 * The values are mapped into an array to be provided to the sql
 * query
 * @param {Object} newData {field1: updatedValue1,field2: updatedValue2, ...}
 * @param {Object} jsToSql {firstName:"first_name",
 * lastName:"last_name",age:"age"}
 * @returns {Object} {setColumns, values}
 */
function sqlUpdate(newData, jsToSql) {
	const keys = Object.keys(newData);
	if (keys.length === 0) throw new BadRequestError("No data given");

	const columns = keys.map(
		(columnName, idx) => `"${jsToSql[columnName] || columnName}"=$${idx + 1}`
	);

	return {
		setColumns: columns.join(", "),
		values: Object.values(newData),
	};
}
