# =============================================================================
# StatusPost - Multi-stage Docker Build
# =============================================================================
# Uses ARO buildsystem to compile, then ARO runtime to execute
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Build
# -----------------------------------------------------------------------------
FROM ghcr.io/arolang/aro-buildsystem:latest AS builder

WORKDIR /app

# Copy application source files
COPY *.aro ./
COPY openapi.yaml ./
COPY templates/ ./templates/

# Compile to native binary
RUN aro build . --optimize

# -----------------------------------------------------------------------------
# Stage 2: Runtime
# -----------------------------------------------------------------------------
FROM ghcr.io/arolang/aro-runtime:latest

WORKDIR /app

# Copy compiled binary from builder
COPY --from=builder /app/StatusPost ./StatusPost

# Copy runtime assets (templates, openapi spec)
COPY --from=builder /app/openapi.yaml ./
COPY --from=builder /app/templates/ ./templates/

# Expose HTTP port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Run the application
CMD ["./StatusPost"]
