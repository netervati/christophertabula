from app import app, config
import os

if __name__ == '__main__':
    import uvicorn

    is_not_production = config.get('FAST_API_ENVIRONMENT') != 'production'

    uvicorn.run('app:app', reload = is_not_production)
