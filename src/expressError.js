/** ExpressError a class to make server errors
 * to handle various status code errors to display
 * custom error messages.
 */
class ExpressError extends Error {
	constructor(message, status) {
		super();
		this.message = message;
		this.status = status;
	}
}

class NotFoundError extends ExpressError {
	constructor(message = "We could not find what you are looking for") {
		super(message, 404);
	}
}

class ForbiddenError extends ExpressError {
	constructor(message = "Forbidden access") {
		super(message, 403);
	}
}

class UnauthorizedError extends ExpressError {
	constructor(message = "Sorry you're not authorized for this resource") {
		super(message, 401);
	}
}

class BadRequestError extends ExpressError {
	constructor(message = "Bad request") {
		super(message, 400);
	}
}

module.exports = {
	ExpressError,
	NotFoundError,
	ForbiddenError,
	UnauthorizedError,
	BadRequestError,
};
