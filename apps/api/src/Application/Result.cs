using KnowledgeManagementApp.Api.Domain.Errors;

namespace KnowledgeManagementApp.Api.Application;

/// <summary>
/// Represents the result of an operation that does not return a value.
/// </summary>
public class Result
{
    /// <summary>
    /// Gets a value indicating whether the operation succeeded.
    /// </summary>
    public bool IsSuccess { get; }

    /// <summary>
    /// Gets a value indicating whether the operation failed.
    /// </summary>
    public bool IsFailure => !IsSuccess;

    /// <summary>
    /// Gets the error associated with the failure.
    /// </summary>
    /// <value>
    /// An <see cref="Error"/> representing the error that occurred.
    /// The default is <see cref="Error.None"/> when the operation succeeded.
    /// </value>
    public Error Error { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="Result"/> class.
    /// </summary>
    /// <param name="isSuccess"><see langword="true"/> if the operation succeeded; otherwise, <see langword="false"/>.</param>
    /// <param name="error">The error associated with the failure.</param>
    private Result(bool isSuccess, Error error)
    {
        IsSuccess = isSuccess;
        Error = error;
    }

    /// <summary>
    /// Creates a successful result.
    /// </summary>
    /// <returns>A <see cref="Result"/> with <see cref="IsSuccess"/> set to <see langword="true"/> and <see cref="Error"/> set to <see cref="Error.None"/>.</returns>
    public static Result Success()
    {
        return new Result(true, Error.None);
    }

    /// <summary>
    /// Creates a failed result with the specified error.
    /// </summary>
    /// <param name="error">The error that caused the failure.</param>
    /// <returns>A <see cref="Result"/> with <see cref="IsSuccess"/> set to <see langword="false"/> and the specified <paramref name="error"/>.</returns>
    public static Result Failure(Error error)
    {
        return new Result(false, error);
    }
}

/// <summary>
/// Represents the result of an operation that returns a value of type <typeparamref name="T"/>.
/// </summary>
/// <typeparam name="T">The type of the value returned by the operation.</typeparam>
public class Result<T>
{
    /// <summary>
    /// Gets a value indicating whether the operation succeeded.
    /// </summary>
    public bool IsSuccess { get; }

    /// <summary>
    /// Gets a value indicating whether the operation failed.
    /// </summary>
    public bool IsFailure => !IsSuccess;

    /// <summary>
    /// Gets the value associated with the successful result.
    /// </summary>
    /// <value>
    /// The value of type <typeparamref name="T"/> returned by the operation.
    /// The default is <see langword="default"/> when the operation failed.
    /// </value>
    public T? Value { get; }

    /// <summary>
    /// Gets the error associated with the failure.
    /// </summary>
    /// <value>
    /// An <see cref="Error"/> representing the error that occurred.
    /// The default is <see cref="Error.None"/> when the operation succeeded.
    /// </value>
    public Error Error { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="Result{T}"/> class.
    /// </summary>
    /// <param name="isSuccess"><see langword="true"/> if the operation succeeded; otherwise, <see langword="false"/>.</param>
    /// <param name="value">The value returned by the operation.</param>
    /// <param name="error">The error associated with the failure.</param>
    private Result(bool isSuccess, T? value, Error error)
    {
        IsSuccess = isSuccess;
        Value = value;
        Error = error;
    }

    /// <summary>
    /// Creates a successful result with the specified value.
    /// </summary>
    /// <param name="value">The value returned by the operation.</param>
    /// <returns>A <see cref="Result{T}"/> with <see cref="IsSuccess"/> set to <see langword="true"/> and the specified <paramref name="value"/>.</returns>
    public static Result<T> Success(T value)
    {
        return new Result<T>(true, value, Error.None);
    }

    /// <summary>
    /// Creates a failed result with the specified error.
    /// </summary>
    /// <param name="error">The error that caused the failure.</param>
    /// <returns>A <see cref="Result{T}"/> with <see cref="IsSuccess"/> set to <see langword="false"/> and the specified <paramref name="error"/>.</returns>
    public static Result<T> Failure(Error error)
    {
        return new Result<T>(false, default, error);
    }
}
