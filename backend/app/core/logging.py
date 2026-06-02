import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s"
)

logger = logging.getLogger("app")

# from app.core.logging import logger
# logger.info("Creating user", extra={"email": email})
# logger.error("Topic not found", extra={"topic_id": topic_id})